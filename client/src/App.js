import React, { Component } from 'react';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';

import { withStyles } from '@material-ui/core/styles';


const styles = theme =>({
  root:{
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table:{
    minWidth:1080
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
})




class App extends Component {
///* 맵을 사용할때는 고유한 키값을 줘야한다.

state = {
  customers: "",
  completed: 0 
}

componentDidMount(){
  this.timer = setInterval(this.progress, 20);
   this.callApi()
  
   //componentDidMount()가 callApi를 호출(비동기적으로)하고 이결과를 받아와서...상태가 변화(setState)되고  React에서 이를감지하고 뷰가 재구성되기 [ render() ]때문에  화면에 보여지게되는것이다.
   .then(res => this.setState({customers: res}))
   .catch(err => console.log(err));
}

callApi = async () => {
  const response = await fetch('/api/customers');
  const body = await response.json();
  return body;
}

progress = () => {
  const { completed } = this.state;
  this.setState({ completed : completed >= 100 ? 0 : completed + 1 });

}

  render() {
    const { classes } = this.props;  // 새로 추가된  style이 적용될수 있도록 classes 변수를 하나만들어서 
    return (
      <div>     
      <Paper className={classes.root}>        
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>          
            {this.state.customers ? this.state.customers.map(c => { return( <Customer key={c.id} id={c.id} image={c.image} name={c.NAME} birthday={c.birthday} gender={c.gender} job={c.job}  ></Customer>  );
            }) : "" }
            <TableRow>
              <TableCell colSpan="6" align="center">
                <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}></CircularProgress>
              </TableCell>
            </TableRow>
         </TableBody>
        </Table>      
      </Paper>
      <CustomerAdd></CustomerAdd>
      </div>
    )
  }
}
export default withStyles(styles) (App);



/* <Customer
        id={customers[0].id}
        image={customers[0].image}
        name={customers[0].name}
        birthday={customers[0].birthday}
        gender={customers[0].gender}
        job={customers[0].job}
      ></Customer>

      <Customer
      id={customers[1].id}
      image={customers[1].image}
      name={customers[1].name}
      birthday={customers[1].birthday}
      gender={customers[1].gender}
      job={customers[1].job}
    ></Customer>

    <Customer
    id={customers[2].id}
    image={customers[2].image}
    name={customers[2].name}
    birthday={customers[2].birthday}
    gender={customers[2].gender}
    job={customers[2].job}
  ></Customer> */
