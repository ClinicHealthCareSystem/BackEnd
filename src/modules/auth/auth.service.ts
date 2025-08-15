import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService{
    constructor(private usersService: UserService,
        private readonly jwtService: JwtService
    ){}

    async signIn(userCPF: string, pass: string): Promise<any>{
        const user = await this.usersService.findByCPF(userCPF);
        if(!user ||!user.password) throw new UnauthorizedException
        const ok = await bcrypt.compare(pass, user.password);
        if(!ok) throw new UnauthorizedException();
        const payload = {sub: user.id, username: user.name}
        
        return{access_token: await this.jwtService.signAsync(payload)} 
    }
}