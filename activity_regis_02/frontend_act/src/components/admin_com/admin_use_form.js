import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';


export function useForm(initialFValues) {
  
    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});
    const [num_valid, setNum_valid] = useState(false);
    const [topic_valid, setTopic_valid] = useState(false);
    const [des_valid, setDes_valid] = useState(false);
    const [place_valid, setPlace_valid] = useState(false);
    const [regis_valid, setRegis_valid] = useState(false);
    const [act_valid, setAct_valid] = useState(false);



    const isEmpty = (str) => {
        return (!str || str.length === 0);
    }


    const handleInputChange = e => {

        const {name, value} = e.target

        let check_topic_is_none = (e.target.name == 'topic' && isEmpty(e.target.value))
        let check_description_is_none = (e.target.name == 'description' && isEmpty(e.target.value))
        let check_act_place_is_none = (e.target.name == 'act_place' && isEmpty(e.target.value))
        let check_regis_is_none = (e.target.name == 'regis_date' && isEmpty(e.target.value))
        let check_act_is_none = (e.target.name == 'act_date' && isEmpty(e.target.value))
        let check_num_is_negative = (e.target.name == 'member_limit' && e.target.value <= 0)
        



        if (e.target.name == 'topic'){
            if (check_topic_is_none ){
                setTopic_valid(false)
            } else {
                setTopic_valid(true)
            }
        } else if (e.target.name == 'description'){
            if (check_description_is_none ){
                setDes_valid(false)
            } else {
                setDes_valid(true)
            }    
        } else if (e.target.name == 'act_place'){
            if (check_act_place_is_none ){
                setPlace_valid(false)
            } else {
                setPlace_valid(true)
            }
        } else if (e.target.name == 'member_limit'){
            if (check_num_is_negative ){
                setNum_valid(false)
            } else if (e.target.name == 'member_limit' && e.target.value > 0) {
                setNum_valid(true)
            }
        } else if (e.target.name == 'regis_date'){
            if (check_regis_is_none ){
                setRegis_valid(false)
            } else {
                setRegis_valid(true)
            }
        } else if (e.target.name == 'act_date'){
            if (check_act_is_none ){
                setAct_valid(false)
            } else {
                setAct_valid(true)
            }
        }

        setValues({
            ...values,
            [name]: value
        })
    }

  return ({
      values,
      setValues,
      errors,
      setErrors,
      handleInputChange,
      num_valid,
      topic_valid,
      des_valid,
      place_valid,
      regis_valid,
      act_valid,
  });
}

const useStyles = makeStyles(theme => ({
    root : {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        }
    }
}))

export function Form(props) {

    const classes = useStyles();
    const {children,...other} = props;

  return (
    <form className={classes.root} autoComplete="off" {...other}>
        {props.children}
    </form>
  )
}
