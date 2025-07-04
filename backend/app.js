const usersRouter = require('./routes/users');
const bilansRouter = require('./routes/bilans');
const referencesRouter = require('./routes/references');

app.use('/api/users', usersRouter);
app.use('/api/bilans', bilansRouter);
app.use('/api/references', referencesRouter); 