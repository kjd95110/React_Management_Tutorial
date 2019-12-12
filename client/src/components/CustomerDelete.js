import React from 'react';

class CustomerDelete extends React.Component{
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
            <button onClick={(e) => {this.deleteCustomer(this.props.id)} }>삭제</button>
        )
    }
}
//외부에서 사용할수 있도록 해주기위해서...
export default CustomerDelete;

