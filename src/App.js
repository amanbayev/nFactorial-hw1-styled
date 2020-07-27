import React from 'react';
import './App.css';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  },
}));

let getRandomInt = (max) => {
  let min = Math.ceil(0);
  let maxx = Math.floor(max) - 1;
  let random = Math.floor(Math.random() * (maxx - min + 1)) + min;
  return random;
};

function App() {
  const classes = useStyles();

  const [text, setText] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  const [questionIndex, setQuestionIndex] = React.useState(getRandomInt(3));
  const [feedback, setFeedback] = React.useState('');

  const questionsArray = [
    {
      question: "What's the capital of Kazakhstan?",
      answer: 'Astana',
      openEnded: true, // openEnded
    },
    {
      question: 'Can you divide by zero?',
      openEnded: false,
      answerOptions: ['Yes', 'No'],
      answer: 'No',
    },
    {
      question: 'Are we there yet?',
      openEnded: false,
      answerOptions: ['no', 'yes', 'maybe', 'who knows?'],
      answer: 'yes',
    },
  ];

  let renderInput = () => (
    <>
      <input
        value={text}
        onChange={(event) => {
          setText(event.target.value);
          setAnswer(event.target.value);
        }}
      ></input>

      <button
        onClick={() => {
          setText('');
        }}
      >
        Reset
      </button>
    </>
  );

  let makeOption = (option) => <option key={option}>{option}</option>;

  let wrapSelect = () => (
    <select
      id="answers"
      onChange={(event) => {
        setAnswer(event.target.value);
      }}
    >
      {questionsArray[questionIndex].answerOptions.map(makeOption)}
    </select>
  );

  return (
    <div className="background">
      <Grid
        container
        className={classes.root}
        spacing={2}
        style={{ marginTop: 20 }}
      >
        <Grid item xs={12}>
          <Grid container justify="center" alignItems="center" spacing={2}>
            <Paper className={classes.paper} style={{ padding: 20 }}>
              <form className={classes.root} noValidate autoComplete="off">
                <Typography variant="h4" gutterBottom>
                  {questionsArray[questionIndex]
                    ? questionsArray[questionIndex].question
                    : 'Question is loading'}
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Your answer"
                  variant="outlined"
                  value={text}
                  onChange={(event) => {
                    setText(event.target.value);
                    setAnswer(event.target.value);
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    answer === questionsArray[questionIndex].answer
                      ? setFeedback('Your answer ' + answer + ' was correct!')
                      : setFeedback('Your answer was NOT correct!');
                    setQuestionIndex(getRandomInt(questionsArray.length));
                  }}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setText('');
                  }}
                >
                  Reset
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
