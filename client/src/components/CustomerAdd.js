import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
})

class CustomerAdd extends React.Component{

constructor(props){
    super(props);
    this.state={
        file: null,
        username: '',
        birthday: '',
        gender: '',
        job:'',
        fileName:'',
        open: false
    }
}

handleFileChange = (e) => {
    this.setState({
        file: e.target.files[0],
        fileName: e.target.value
    })
}

handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
}


//실제로 고객데이터가 새로 추가되었을때 
handleFormSubmit = (e) => {

    e.preventDefault();
    this.addCustomer()
    .then((response) => {
        console.log(response.data);
        this.props.stateRefresh();  //잘이해안됨...왜 여기에 넣어야 하나???
        //부모에서 만든 App내의 함수를 props형태로 받아와 실행하는모습.
        // App.js에서  <CustomerAdd stateRefresh={this.stateRefresh}></CustomerAdd>
    })

    this.setState({
        file: null,
        userName: '',
        birthday: '',
        gender: '',
        job:'',
        fileName: '',
        open:false
    })

    //this.props.stateRefresh();
  //  window.location.reload();  //데이터를 새로 받아오기위함 이며 아주 구시대적 방식.
}

addCustomer = () => {
    const url = '/api/customers';
    const formData = new FormData();
    formData.append('image',this.state.file);
    formData.append('name',this.state.userName);
    formData.append('birthday',this.state.birthday);
    formData.append('gender',this.state.gender);
    formData.append('job',this.state.job);
//전달하고자 하는 데이터에 파일이 포함되어있을경우
//파일양식(형식)정보를 함께 전송해줘야 한다.
    const config={
        header: {
            'content-type': 'multipart/form-data'
        }
    }
    return post(url, formData, config);
}

handleClickOpen = () => {  //  handleClickOpen() 자동으로 바인딩 처리안됨
    this.setState({
        open: true
    });
}

handleClose = () => {   //handleClose() 자동으로 바인딩 처리안됨
    this.setState({
        file: null,
        userName: '',
        birthday: '',
        gender: '',
        job:'',
        fileName: '',
        open: false
    })
}

render(){
    const { classes } = this.props;
    return(
        <div>
            <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                고객추가하기
            </Button>
            <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle>고객추가</DialogTitle>
                <DialogContent>
                    <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}></input>
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" color="primary" component="span" name="file">
                            {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                        </Button>
                    </label>
                    <br />
                        <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}></TextField><br />
                        <TextField label="생년월일" type="text" name="birthday" value={this.state.birthday}  onChange={this.handleValueChange}></TextField><br />
                        <TextField label="성별" type="text" name="gender" value={this.state.gender}  onChange={this.handleValueChange}></TextField><br />
                        <TextField label="직업" type="text" name="job" value={this.state.job}  onChange={this.handleValueChange}></TextField><br />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                    <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

}
//디자인요소가 적용되어있기 때문에 이것을 유지하기위해
//export default CustomerAdd;
export default withStyles(styles)(CustomerAdd);

