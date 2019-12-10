import React, { Component } from 'react';
import Customer from './components/Customer';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';


const styles = theme =>({
  root:{
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table:{
    minWidth:1080
  }
})




class App extends Component {
///* 맵을 사용할때는 고유한 키값을 줘야한다.

state = {
  customers: ""
}

componentDidMount(){
  this.callApi()
  
  //받아와서...
  .then(res => this.setState({customers: res}))
  .catch(err => console.log(err));
}

callApi = async () => {
  const response = await fetch('/api/customers');
  const body = await response.json();
  return body;
}

  render() {
    const { classes } = this.props;  // 새로 추가된  style이 적용될수 있도록 classes 변수를 하나만들어서 
    return (     
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
            {this.state.customers ? this.state.customers.map(c => { return( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}  ></Customer>  );
            }) : "" }
          
         </TableBody>
        </Table>      
      </Paper>      
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
