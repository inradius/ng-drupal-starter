export class Menu {
    constructor (
        public title: string,
        public description: string,
        public url: string,
        public weight: number,
        public expanded: boolean,
        public hasChildren: boolean,
        public isExternal: boolean,
        public children?: Array<Menu>) {}
}
