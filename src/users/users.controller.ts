import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { User } from './models/users.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    public async signUp(@Body() signUpDto: SignUpDto): Promise<User> {
        return this.usersService.signUp(signUpDto);
    }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    public async signIn(@Body() signInDto: SignInDto): Promise<{name: string; jwtToken: string; email: string;}> {
        return this.usersService.signIn(signInDto);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.OK)
    public async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }
}
