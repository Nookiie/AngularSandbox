import { User } from '../model/user';
import * as file from 'jsonfile'

export class JsonUtils {
    
    writeToJson(users: User[], pathFile?: string): void {
        /*
        let json = JSON.stringify(users);
        let jsonFile = require('jsonfile');
        
        if (pathFile === null) {
            jsonFile.writeFile('C:/users.json', json, function(err){
                if(err) console.error(err);
            })
        }
        else {
            jsonFile.writeFile(pathFile, json, function(err){
                if(err) console.error(err);
            })
        }
        */
    }
}
