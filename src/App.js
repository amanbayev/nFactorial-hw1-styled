import React from 'react';
import './App.css';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SweetAlert from 'sweetalert2-react';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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
  const [feedback, setFeedback] = React.useState('You are wrong!');

  const [showAlert, setShowAlert] = React.useState(false);

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
        color="secondary"
        onClick={() => {
          setText('');
        }}
      >
        Reset
      </Button>
    </>
  );

  let makeOption = (option) => (
    <FormControlLabel
      key={option}
      value={option}
      control={<Radio />}
      label={option}
    />
  );

  let wrapSelect = () => (
    <FormControl component="fieldset">
      <FormLabel component="legend">Your answer</FormLabel>
      <RadioGroup
        aria-label="answer"
        name="answer"
        value={answer}
        onChange={(selectedRadio) => {
          console.log('radio is');
          console.log(selectedRadio.target.value);
          setAnswer(selectedRadio.target.value);
        }}
      >
        {questionsArray[questionIndex].answerOptions.map(makeOption)}
      </RadioGroup>
    </FormControl>
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
                {questionsArray[questionIndex] &&
                questionsArray[questionIndex].openEnded
                  ? renderInput()
                  : ''}
                {questionsArray[questionIndex] &&
                !questionsArray[questionIndex].openEnded
                  ? wrapSelect()
                  : ''}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    answer === questionsArray[questionIndex].answer
                      ? setFeedback('You are right! YAY!')
                      : setFeedback('You are not prepared!!!');
                    setQuestionIndex(getRandomInt(questionsArray.length));
                    setShowAlert(true);
                    setText('');
                  }}
                >
                  Submit
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <SweetAlert
        show={showAlert}
        title={feedback}
        // text={feedback}
        onConfirm={() => setShowAlert(false)}
      />
    </div>
  );
}

export default App;
