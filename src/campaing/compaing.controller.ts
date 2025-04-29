import { BadRequestException, Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import CampaingService from "./campaing.service";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateCampaignDto } from "./createCampaing.dto";
import { CloudinaryService } from "../common/cloudinary.service";

@Controller('campaigns')
export default class CampaingController {
    constructor(
        private readonly service: CampaingService,
        private readonly cloudinaryService: CloudinaryService,
    ) { }

    @Post('create')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads/campaigns',
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
                },
            }),
            fileFilter: (req, file, cb) => {
                const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                if (!allowedTypes.includes(file.mimetype)) {
                    cb(
                        new BadRequestException('Only jpeg, jpg and png images are allowed'),
                        false,
                    );
                } else {
                    cb(null, true);
                }
            },
            limits: {
                fileSize: 10 * 1024 * 1024,
            },
        }),
    )
    async uploadCampaign(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: CreateCampaignDto,
    ) {
        const filePath = file.path;
        const uploadedImage = await this.cloudinaryService.uploadImage(filePath);
        const secureUrl = uploadedImage.secure_url;


        return this.service.create(body, secureUrl);
    }

    @Get(':id')
    async getOneById(@Param('id') id: number) {
        return this.service.getById(id);
    }

    @Get('business/:id')
    async getByBusiness(@Param('id') id: number) {
        return this.service.getAllByBusinessId(id);
    }
}