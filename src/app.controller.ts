import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './create.user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // curl http://localhost:3000/ -d '{"email":"manzhiyuan@lixiang.com", "password":"balala"}' -H "Content-Type: application/json" => good
  // curl http://localhost:3000/ -d '{}' -H "Content-Type: application/json" => bad
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  @Get('/n/:id')
  findOne(@Param('id') id: number): string {
    console.log(typeof id === 'number'); // true
    return 'This action returns a user';
  }

  // curl -X GET http://localhost:3000/q\?id\=1 => good
  // curl -X GET http://localhost:3000/q\?id\=a => good
  // curl -X GET http://localhost:3000/q        => good
  @Get('/q')
  findTwo(@Query('id') id: number): string {
    console.log(typeof id === 'number'); // true
    return `param:[${id}], type:[${typeof id}]`;
  }

  // curl -X GET http://localhost:3000/y         => 400
  // curl -X GET http://localhost:3000/y\?id\=a  => 400
  // curl -X GET http://localhost:3000/y\?id\=1  => good
  @Get('/y')
  findThree(@Query('id', ParseIntPipe) id: number): string {
    console.log(typeof id === 'number'); // true
    return `param:[${id}], type:[${typeof id}]`;
  }
}
