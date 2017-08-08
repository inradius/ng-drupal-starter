export class User {
    uid: number;
    uuid: string;
    langcode: string;
    name: string;
    mail: string;
    created: string;
    updated: string;

    constructor(options: {} = {}) {
        this.uid = options['uid'] || null;
        this.uuid = options['uuid'] || null;
        this.langcode = options['langcode'] || '';
        this.name = options['username'] || '';
        this.mail = options['email'] || '';
        this.created = options['created'] || '';
        this.updated = options['updated'] || '';
    }
}
