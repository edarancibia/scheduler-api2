import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import UserService from "./user.service";
import CreateUserDto from "./createUser.dto";
import { User } from "./user.entity";

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
}
