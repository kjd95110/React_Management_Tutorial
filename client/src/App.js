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

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme =>({
  root:{
    width: '100%',
    minWidth:1080       
  },
  menu:{
    marginTop:15,
    marginBottom:15,
    display:'flex',
    justifyContent:'center'
  },
  paper:{
    marginLeft:18,
    marginRight:18
  },
  grow:{
    flexGrow:1,
  },
  TableHead:{
    fontSize:'1.3rem'
  },
  progress: {
    margin: theme.spacing.unit * 2
  } ,

  menuButton: {
    marginLeft:-12,
    marginRight: 20,
  },
  toolbar: {
    minHeight: 128,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  title: {
    display:'none',
    [theme.breakpoints.up('sm')]:{
      display:'block',
    },
    search:{
      position:'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white,0.15),
      '&:hover':{
        backgroundColor:fade(theme.palette.common.white,0.25),
      },
      marginLeft:0,
      width: '100%',
      [theme.breakpoints.up('sm')]:{
        marginLeft: theme.spacing.unit,
        whdth: 'auto',
      }
    } ,  
  },
  searchIcon:{
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iinputRoot:{
    color:'inherit',
    width:'100%',
  },
  inputInput:{
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]:{
      width:120,
      '&:focus':{
        width:200,
      },
    },
  }

});

class App extends Component {
///* 맵을 사용할때는 고유한 키값을 줘야한다.

// state = {
//   customers: "",
//   completed: 0 
// }

//생성자 처리
constructor(props){
  super(props);
  this.state={
    customers: '',
    completed: 0,
    searchKeyword: ''
  }
}

//상태를 초기화하고 고객목록을 다시호출하는 함수 생성
stateRefresh = () => {
  this.setState({
    customers: '',
    completed: 0 ,
    searchKeyword: ''
  });

  this.callApi()
  
  //componentDidMount()가 callApi를 호출(비동기적으로)하고 이결과를 받아와서...상태가 변화(setState)되고  React에서 이를감지하고 뷰가 재구성되기 [ render() ]때문에  화면에 보여지게되는것이다.
  .then(res => this.setState({customers: res}))
  .catch(err => console.log(err));

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

handleValueChange = (e) => {
  let nextState = {};
  nextState[e.target.name] = e.target.value;
  this.setState(nextState);
}


  render() {
    const filteredComponents = (data) => {
      data = data.filter((c) => {
         // console.log('myname is ' + c);
        //  for(var key in c){
        //   console.log("Attribute:" + key + " , value: " + c[key]);
        // }

        return c.NAME.indexOf(this.state.searchKeyword) > -1;         
          
      });

      return data.map((c) => {
          return <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.NAME} birthday={c.birthday} gender={c.gender} job={c.job}></Customer>
      });

    };

    const { classes } = this.props;  // 새로 추가된  style이 적용될수 있도록 classes 변수를 하나만들어서 
    const cellList = ["번호","프로필이미지","이름","생년월일","성별","직업","설정"]
    return (
      <div className={classes.root}>
          <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer" >
                  <MenuIcon />
                </IconButton>
                <Typography className={classes.title} variant="h6" noWrap>
                  고객 관리 시스템
                </Typography>
                <div className={classes.grow}></div>
                  <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase placeholder="검색하기"
                   classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}  
                    name="searchKeyword"
                    value={this.state.searchKeyword}
                    onChange={this.handleValueChange}
                  />
                </div>
              </Toolbar>
            </AppBar>

          <div className={classes.menu}>
              <CustomerAdd stateRefresh={this.stateRefresh}></CustomerAdd>
            </div>
      <Paper className={classes.paper} >        
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {cellList.map(c => {
                return <TableCell className={classes.TableHead}>{c}</TableCell>
              })              
            }
            </TableRow>
          </TableHead>
          <TableBody>          
            {
              this.state.customers ? 
              filteredComponents(this.state.customers) :            
                  <TableRow>
                    <TableCell colSpan="6" align="center">
                      <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}></CircularProgress>
                    </TableCell>
                  </TableRow>
            }
         </TableBody>
        </Table>      
      </Paper>
     
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
