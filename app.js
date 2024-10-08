const express = require('express');
const bodyParser = require('body-parser');
const { Op } = require('sequelize'); // Import Op for Sequelize operators
const app = express();
const port = 3000;
const JobApplication = require('./models/jobApplication');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Ensure this line is present to serve static files

// Helper function to handle errors
const handleError = (res, error) => {
    console.error(error);
    res.status(500).send('Internal Server Error');
};

// Route to display job applications with optional search, filter, and pagination
app.get('/', async (req, res) => {
    try {
        const { search, status, sort, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        let whereClause = {};

        if (search) {
            whereClause[Op.or] = [
                { company: { [Op.like]: `%${search}%` } },
                { position: { [Op.like]: `%${search}%` } }
            ];
        }

        if (status) {
            whereClause.status = status;
        }

        const orderClause = sort ? [[sort, 'ASC']] : [];

        const { rows: jobApplications, count } = await JobApplication.findAndCountAll({
            where: whereClause,
            order: orderClause,
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        const totalPages = Math.ceil(count / limit);

        // Fetch summary data
        const totalApplications = await JobApplication.count();
        const acceptedCount = await JobApplication.count({ where: { status: 'Accepted' } });
        const inProgressCount = await JobApplication.count({ where: { status: 'In-Progress' } });
        const rejectedCount = await JobApplication.count({ where: { status: 'Rejected' } });

        const summary = {
            totalApplications,
            acceptedCount,
            inProgressCount,
            rejectedCount
        };

        res.render('index', { jobApplications, search, status, sort, page: parseInt(page), totalPages, summary });
    } catch (error) {
        handleError(res, error);
    }
});

// Route to render the edit job application form
app.get('/edit/:id', async (req, res) => {
    try {
        const jobApplication = await JobApplication.findByPk(req.params.id);
        if (!jobApplication) {
            return res.status(404).send('Job application not found');
        }
        res.render('edit', { jobApplication });
    } catch (error) {
        handleError(res, error);
    }
});

// Route to handle updating a job application
app.post('/edit/:id', async (req, res) => {
    try {
        const { company, position, status, applicationDate, notes } = req.body;
        await JobApplication.update(
            { company, position, status, applicationDate, notes, lastEdited: new Date() },
            { where: { id: req.params.id } }
        );
        res.redirect('/');
    } catch (error) {
        handleError(res, error);
    }
});

// Route to handle deleting a job application
app.post('/delete/:id', async (req, res) => {
    try {
        await JobApplication.destroy({ where: { id: req.params.id } });
        res.redirect('/');
    } catch (error) {
        handleError(res, error);
    }
});

app.listen(port, () => {
    console.log(`Job Tracker app listening at http://localhost:${port}`);
});
