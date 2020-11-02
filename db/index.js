const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    //CREATE
    createOrg() {
        return this.connection.query(
            `
            INSERT
                INTO organization (org_name)
                VALUES ?
            `
            );
    }
    
    createTitle() {

    }

    createEmployee() {
        return this.connection.query(
            `
            INSERT INTO 
            `
        );

    }

    //READ
    readTitles() {
        return this.connection.query(
            `
            SELECT
                role.id,
                role.title AS Title,
                role.salary AS Salary,
                organization.org_name AS Organization
            FROM
                ds9_db.role
            LEFT JOIN
                ds9_db.organization ON role.org_id = organization.id
            ORDER BY
                role.salary DESC;
            `
        );
    }

    readEmployees() {
        return this.connection.query(
            // `SELECT
            //     CONCAT_WS(' ', Subordinate.first_name, Subordinate.last_name) AS 'Employee',
            //     role.title AS 'Title',
            //     role.salary AS 'Salary',
            //     organization.org_name AS 'Organization',
            //     CONCAT_WS(' ', Superior.first_name, Superior.last_name) AS 'Manager'
            // FROM 
            //     ds9_db.employee as Subordinate
            // LEFT OUTER JOIN 
            //     ds9_db.employee as Superior
            //     ON Subordinate.manager_id = Superior.id
            // JOIN
            //     ds9_db.role 
            //     ON role.id = Subordinate.role_id
            // JOIN
            //     ds9_db.organization 
            //     ON role.org_id = organization.id
            
            // ORDER BY
            //     role.salary DESC;`
            "SELECT * FROM ds9_db.employee;"
        );
    }

    readOrg() {
        return this.connection.query(
            `
            SELECT
                organization.org_name
            FROM
                ds9_db.organization
            ORDER BY
                organization.id;
            `
        );
    }

    //UPDATE
    updateTitle() {

    }
}

module.exports = new DB(connection);