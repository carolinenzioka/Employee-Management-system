import express from 'express';
import client from '../utils/db.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const router = express.Router()

router.post('/adminlogin', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM admin WHERE email = $1 AND password_ = $2";
    const values = [email, password];

    client.query(sql, values, (err, result) => {

        if (err) return res.status(500).json({ loginStatus: false, error: "Query Error" });
        if (result.rows.length > 0) {
            const email = result.rows[0].email;
            const token = jwt.sign(
                { role: "admin", email: email },
                "jwt_secret_key",
                { expiresIn: "1d" }

            );

            res.cookie('token', token);
            return res.json({ loginStatus: true });
        } else {
            return res.json({ loginStatus: false, Error: "Wrong email or password" });
        }
    });
});

router.get('/department', (req, res) => {
    const sql = "SELECT * FROM department";

    client.query(sql, (err, result) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ Status: false, Error: "Query Error" });
        }
        return res.json({ Status: true, Result: result.rows })
    })

})

router.post('/add_department', (req, res) => {
    const { department } = req.body;
    const sql = "INSERT INTO department (department_name) VALUES ($1)";
    const values = [department];

    client.query(sql, values, (err, result) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ Status: false, Error: "Query Error" });
        }
        return res.json({ Status: true })
    })
})



router.post('/add_employee', (req, res) => {
    const { first_name, middle_name, last_name, email, username, phone_number, ssn, birth_date, position_name, department_id } = req.body;

    console.log("req.body:", req.body);

    if (!first_name || !last_name || !email || !username || !phone_number || !ssn || !birth_date || !position_name || !department_id) {
        return res.status(400).json({ Status: false, Error: 'Required fields are missing.' });
    }

    bcrypt.hash(req.body.password_, 10, (err, hash) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ Status: false, Error: 'Password hashing error' });
        }

        const sql = `INSERT INTO employee 
        (first_name, middle_name, last_name, email, username, phone_number, password_, ssn, birth_date, position_name, department_id) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;

        const values = [first_name, middle_name, last_name, email, username, phone_number, hash, ssn, birth_date, position_name, department_id];
        console.log("Values:", values);

        client.query(sql, values, (err, result) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ Status: false, Error: 'Query Error' });
            }
            return res.json({ Status: true });
        });
    });
});

router.get('/employee', (req, res) => {
    const sql = "SELECT * FROM employee";

    client.query(sql, (err, result) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ Status: false, Error: "Query Error" });
        }
        return res.json({ Status: true, Result: result.rows })
    })

})


router.get('/employee/:emp_id', (req, res) => {
    const emp_id = req.params.emp_id;
    const sql = "SELECT * FROM employee WHERE emp_id = $1";

    client.query(sql, [emp_id], (err, result) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ Status: false, Error: "Query Error" });
        }
        return res.json({ Status: true, Result: result.rows })
    })
})






router.put('/edit_employee/:emp_id', (req, res) => {
    const emp_id = req.params.emp_id;
    const sql = `UPDATE employee 
        set first_name = $1, middle_name = $2, last_name = $3, email = $4, username = $5, phone_number = $6, position_name = $7, department_id = $8
        Where emp_id = $9`
    const values = [
        req.body.first_name,
        req.body.middle_name,
        req.body.last_name,
        req.body.email,
        req.body.username,
        req.body.phone_number,
        req.body.position_name,
        req.body.department_id
    ]
    client.query(sql, [...values, emp_id], (err, result) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ Status: false, Error: "Query Error" });
        }
        return res.json({ Status: true, Result: result.rows })
    })
})

router.delete('/delete_employee/:emp_id', (req, res) => {
    const emp_id = req.params.emp_id;
    const sql = "DELETE FROM employee WHERE emp_id = $1"
    client.query(sql, [emp_id], (err, result) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ Status: false, Error: "Query Error" });
        }
        return res.json({ Status: true, Result: result.rows })
    })
})

router.get('/admin_count', (req, res) => {
    const sql = "SELECT COUNT(admin_id) AS admin FROM admin";
    client.query(sql, (err, result) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ Status: false, Error: "Query Error" });
        }
        return res.json({ Status: true, Result: result.rows })
    })
})

router.get('/employee_count', (req, res) => {
    const sql = "SELECT COUNT(emp_id) AS employee FROM employee";
    client.query(sql, (err, result) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ Status: false, Error: "Query Error" });
        }
        return res.json({ Status: true, Result: result.rows })
    })

})


router.get('/department_count', (req, res) => {
    const sql = "SELECT COUNT(department_id) AS department FROM department";
    client.query(sql, (err, result) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ Status: false, Error: "Query Error" });
        }
        return res.json({ Status: true, Result: result.rows })
    })

})


router.get('/payroll_count', (req, res) => {
    const sql = "SELECT SUM(net_salary) AS payroll FROM payroll";
    client.query(sql, (err, result) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ Status: false, Error: "Query Error" });
        }
        return res.json({ Status: true, Result: result.rows })
    })

})

router.get('/time_off_count', (req, res) => {
    const sql = "SELECT COUNT(status) AS time_off FROM time_off WHERE status = 'Pending'";
    client.query(sql, (err, result) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ Status: false, Error: "Query Error" });
        }
        return res.json({ Status: true, Result: result.rows })
    })

})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ Status: true })
})






export { router as adminRouter };
