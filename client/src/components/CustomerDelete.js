import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class CustomerDelete extends React.Component{

constructor(props){
    super(props);
    this.state={
        open: false
    }
}


handleClickOpen = () => {  //  handleClickOpen() 자동으로 바인딩 처리안됨
    this.setState({
        open: true
    });
}

handleClose = () => {   //handleClose() 자동으로 바인딩 처리안됨
    this.setState({       
        open: false
    })
}


deleteCustomer(id){
    //   ->  /api/customers/7   : 7인 ID를 삭제요청    
    const url = '/api/customers/' + id;

fetch(url, {
    method: 'DELETE'
});
this.props.stateRefresh();

}

    render(){
        return(
            //<button onClick={(e) => {this.deleteCustomer(this.props.id)} }>삭제</button>
            <div>
            
            <Button variant="contained" color="secondary" onClick={this.handleClickOpen }>삭제</Button>
            <Dialog open={this.state.open} onClose={this.handleClose} >
                <DialogTitle onClose={this.handleClose}>
                    삭제경고

                </DialogTitle>
                <DialogContent>
                <Typography gutterBottom> 선택한 고객 정보가 삭제됩니다.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</Button>
                    <Button variant="outlined" color="primary"  onClick={this.handleClose }>닫기</Button>
                </DialogActions>

            </Dialog>
            </div>
        )
    }
}
//외부에서 사용할수 있도록 해주기위해서...
export default CustomerDelete;

