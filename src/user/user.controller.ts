import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import UserService from "./user.service";
import CreateUserDto from "./createUser.dto";
import { User } from "./user.entity";
import CreateInvitationDto from "./createInvitation.dto";
import UserInvitation from "./userInvitation.entity";

@Controller('users')
export default class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Post()
    async createUser(@Body() userDto: CreateUserDto): Promise<User> {
        return await this.userService.create(userDto);
    }

    @Get(':id')
    async findUser(@Param('id') idUser: number): Promise<User> {
        return await this.userService.findUserById(idUser);  
    }

    @Post('invitation')
    async createUserInvitation(@Body() body: CreateInvitationDto): Promise<UserInvitation> {
        return await this.userService.createInvitation(body);
    }
}
