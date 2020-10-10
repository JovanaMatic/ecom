const fs = require('fs');
const crypto = require('crypto');

module.exports = class Repository {
    constructor(filename) {
        if(!filename) {
            throw new Error('creating a repository requires a filename');
        }

        this.filename = filename;
        //check to see if the file exists
        try {
        //we are using here Sync version because contructor is not allowed to be async (we would need to make separate async method), and we know that we are making only one instance of this class, so we will call this fs function only once )
        fs.accessSync(this.filename);
        } catch (err) {
            //if it does not exist create a file
            fs.writeFileSync(this.filename, '[]');
        }
    }
    async create(attrs) {
        attrs.id = this.randomID();

        const records = await this.getAll();
        records.push(attrs);
        await this.writeAll(records);

        return attrs;
    }
    async getAll() {
        // open the file this.filename
        // read it
        // return the parsed data, we parse it because [] is a string
        return JSON.parse( 
            await fs.promises.readFile(this.filename, { encoding: 'utf-8' }));

        // parse the file
        //const data = JSON.parse(contents);
        //return data;
    }

    async writeAll(records) {
        //write the updated records array to this.filename
        await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
    }
    randomID() {
        return crypto.randomBytes(4).toString('hex');
    }
    async getOne(id) {
        const records = await this.getAll();
        return records.find(record => record.id === id);
    }
    async delete(id) {
        const records = await this.getAll(); 
        const filteredRecords = records.filter(item => item.id !== id);
        await this.writeAll(filteredRecords);
    }
    async update(id, attrs) {
        const records = await this.getAll();
        const record = records.find(record => record.id === id);
        if(!record) {
            throw new Error(`record with id: ${id} not found`);
        } 
        // taking all the properties from attrs and assigning them to record
        Object.assign(record, attrs);
        await this.writeAll(records);
    }
    async getOneBy(filters) {
        const records = await this.getAll();
        for (let record of records) {
            let found = true;
            //if all the keys of an object through which we are itterating are true return found
            //here we are iterating throug filetrs object and we are using for in loop to iterate trough object KEYS
            for(let key in filters) {
                if(record[key] !== filters[key]) {
                    found = false;
                }
            }
            //if we found the filters matching object, found is true:
            if(found) {
                return record;
            }
        }
    }
}

