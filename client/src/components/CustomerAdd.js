import React from 'react';
import { post } from 'axios';


class CustomerAdd extends React.Component{

constructor(props){
    super(props);
    this.state={
        file: null,
        username: '',
        birthday: '',
        gender: '',
        job:'',
        fileName:''
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
        fileName: ''
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

render(){
    return(
        <form onSubmit={this.handleFormSubmit}>
            <h1>고객 추가</h1>
            프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}></input><br></br>
            이       름 : <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}></input><br></br>
            생 년 월 일 : <input type="text" name="birthday" value={this.state.birthday}  onChange={this.handleValueChange}></input><br></br>
            성        별: <input type="text" name="gender" value={this.state.gender}  onChange={this.handleValueChange}></input><br></br>
            직        업: <input type="text" name="job" value={this.state.job}  onChange={this.handleValueChange}></input><br></br>
            <button type="submit">추가하기</button>
        </form>

    )
}

}

export default CustomerAdd;