import { NextFunction, Request, Response } from "express"
const jwt = require("jsonwebtoken");

interface interfaceProps {
  permissionFor: string[]
}

function verifyToken (props:interfaceProps) {
  
  return (req:Request, res:Response, next:NextFunction) => {
  
    const headerAuthorization:any = req.headers.authorization

    if (typeof headerAuthorization !== "undefined") {

      const token = headerAuthorization.split(" ")[1];
      
      jwt.verify(token, "case-9", (err:any, decoded:any) => {
        
        if(err){
          return res.status(401).json({ message: "Unauthorized!" });
        } else if(!props.permissionFor.includes(decoded.user.role) || (props.permissionFor.includes(decoded.user.role) && decoded.user.role !== "admin" && (req.params.id && req.params.id !== decoded.user._id))) {
          return res.status(401).json({ message: `You don't have permission!` });
        } else {
          req.body.token = decoded;
          next();
        }

      });
        
    }

  }
}

module.exports = verifyToken