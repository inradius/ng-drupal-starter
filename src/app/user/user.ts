export class User {
    uid: number;
    uuid: string;
    langcode: string;
    username: string;
    email: string;
    timezone: string;
    status: boolean;
    created: string;
    updated: string;

    constructor(options: {} = {}) {
        this.uid = options['uid'] || null;
        this.uuid = options['uuid'] || '';
        this.langcode = options['langcode'] || '';
        this.username = options['name'] || '';
        this.email = options['mail'] || '';
        this.timezone = options['timezone'] || '';
        this.status = options['status'] || false;
        this.created = options['created'] || '';
        this.updated = options['updated'] || '';
    }
}
