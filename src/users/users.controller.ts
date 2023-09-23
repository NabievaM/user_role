import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { AddRoleDto } from 'src/auth/dto/add-role.dto';
import { ActivateUserDto } from './dto/activate-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Foydalanuvchilar')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOperation({ summary: 'Foydalanuvchi yaratish' })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOperation({ summary: "Foydalanuvchilarni ko'rish" })
  @ApiResponse({ status: 200, description: 'List of users', type: [User] })
  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: "Foydalanuvchini ID orqali ko'rish" })
  @ApiResponse({ status: 200, description: 'User', type: User })
  @Get(':id')
  getOneUser(@Param('id') id: number): Promise<User> {
    return this.usersService.getOneUser(id);
  }

  @ApiOperation({ summary: "Foydalanuvchini emaili orqali ko'rish" })
  @Get(':id')
  findOne(@Param('email') email: string) {
    return this.usersService.getUserByEmail(email);
  }

  @ApiOperation({ summary: "Foydalanuvchini o'chirib tashlash" })
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
  @ApiOperation({ summary: "Rol qo'shish" })
  @HttpCode(201)
  @Post('add_role')
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.addRole(addRoleDto)
  }

  @ApiOperation({ summary: "Rolni o'chirib tashlash" })
  @HttpCode(200)
  @Post('remove_role')
  removeRole(@Body() AddRoleDto: AddRoleDto) {
    return this.usersService.removeRole(AddRoleDto)
  }

  @ApiOperation({ summary: "Faollashtirish" })
  @HttpCode(200)
  @Post('activate')
  activateUser(@Body() activateUserDto: ActivateUserDto) {
    return this.usersService.activateUser(activateUserDto)
  }
}
