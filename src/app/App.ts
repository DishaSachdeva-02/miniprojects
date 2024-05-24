import { comment } from "./Comment";
export interface App{
_id:string,
user:string,
appName:string,
description:string,
releaseDate:Date,
version:number,
genre:string,
visibility:boolean,
downloadCount :number,
comments:comment[],
averageRating :number,

}