import { Person } from "./person";

export class Contact {
    constructor(
        public id: number,
        public telefone: string,
        public name: string,
        public email: string,
        public person: Person,
    ){};
}
