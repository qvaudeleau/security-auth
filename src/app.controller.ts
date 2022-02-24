import { Controller, Get, Request, Post, UseGuards, Res, HttpStatus, HttpException, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import * as cookieParser from 'cookie-parser';
import passport from 'passport';
import { json } from 'stream/consumers';
import { response } from 'express';
import { GetUser } from './users.getuser';

@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  
  async login(@Request() req, @Res({ passthrough: true }) response) {
    
    
     var loginJsonResult = this.authService.login(req.user);
     response.cookie('access_token',(await loginJsonResult).access_token) 
    return loginJsonResult
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log('salut');
    console.log(req.cookies);
    console.log(req.cookies['access_token']);
    return req.user;
  }




  @UseGuards(JwtAuthGuard)
  @Get('profile/:id')
  getProfilebyid(@Request() req , @GetUser() user  ) {
    //console.log('salut');
    //console.log(req.cookies);
    //console.log(req.cookies['access_token']);
   // console.log(req.user);
    console.log(req.params);
    console.log(user,"salut")


    if (req.user.userId == req.params.id){

    return req.user;

    }
  else {
throw new ForbiddenException

  }


  }




}