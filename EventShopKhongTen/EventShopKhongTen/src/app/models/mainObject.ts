import { GObject } from "./gObject";
import { TextObject } from "./textObject";
import { ImgObject } from "./imgObject";

export class MainObject {

    constructor(
        public gObject: GObject,
        public textObject: TextObject,
        public imgObject: ImgObject
    ) { }

}