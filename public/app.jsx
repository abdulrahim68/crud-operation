
var StudentAll = React.createClass({ 

  getInitialState: function () {
    return { name: '' ,qualification: '',contact:'',id:'',city:'',state:'',Buttontxt:'Save', data1: []};
  },
   handleChange: function(e) {
        this.setState({[e.target.name]: e.target.value});
    },

  componentDidMount() {
 
    $.ajax({
       url: "api/getdata",
       type: "GET",
       dataType: 'json',
       ContentType: 'application/json',
       success: function(data) {         
         this.setState({data1: data}); 
         
       }.bind(this),
       error: function(jqXHR) {
         console.log(jqXHR);
           
       }.bind(this)
    });
  },
  
DeleteData(id){
  var studentDelete = {
        'id': id
           };      
    $.ajax({
      url: "/api/Removedata/",
      dataType: 'json',
      type: 'POST',
      data: studentDelete,
      success: function(data) {
        alert(data.data);
         this.componentDidMount();

      }.bind(this),
      error: function(xhr, status, err) {
         alert(err); 
           
          
      }.bind(this),
      });
    },
 


    EditData(item){         
   this.setState({name: item.name,qualification:item.qualification,contact:item.contact,city:item.city, state:item.state,id:item._id,Buttontxt:'Update'});
     },

   handleClick: function() {
 
   var Url="";
   if(this.state.Buttontxt=="Save"){
      Url="/api/savedata";
       }
      else{
      Url="/api/Updatedata";
      }
      var studentdata = {
        'name': this.state.name,
        'qualification':this.state.qualification,
        'contact':this.state.contact,
        'city':this.state.city,
        'state':this.state.state,
        'id':this.state.id,
        
    }
    $.ajax({
      url: Url,
      dataType: 'json',
      type: 'POST',
      data: studentdata,
      success: function(data) {       
          alert(data.data);       
          this.setState(this.getInitialState());
          this.componentDidMount();
         
      }.bind(this),
      error: function(xhr, status, err) {
         alert(err);     
      }.bind(this)
    });
  },

  render: function() {
    return ( 
    <form > 
      <div className="container-fluid bg-light d-flex justify-content-center"> 
      <table className="table-bordered" >
        <tbody>
          <tr>
            <td><b>Name</b></td>
            <td>
              <input className="form-control" type="text" value={this.state.name}    name="name" onChange={ this.handleChange } />
              <input type="hidden" value={this.state.id}    name="id"  />
            </td>
          </tr>
          <tr>
            <td><b>Qualification</b></td>
            <td>
              <input type="text" className="form-control" value={this.state.qualification}  name="qualification" onChange={ this.handleChange } />
             </td>
          </tr>
         <tr>
            <td><b>Contact</b></td>
             <td>
                 <input type="text"  className="form-control" value={this.state.contact}  name="contact" onChange={ this.handleChange } />
             </td>
         </tr>
         <tr>
      <td><b>City</b></td>
      <td>
        <input type="text"  className="form-control" value={this.state.city}  name="city" onChange={ this.handleChange } />
      </td>
    </tr>
    <tr>
      <td><b>State</b></td>
      <td>
        <input type="text"  className="form-control" value={this.state.state}  name="state" onChange={ this.handleChange } />
      </td>
    </tr>
    </tbody>
    </table>
    </div>
    <div className="container-fluid bg-light d-flex justify-content-center my-1">
    <button className="btn btn-primary  " type="button" value={this.state.Buttontxt} onClick={this.handleClick}>submit</button> 
    </div>

 
<div className="container-fluid bg-light d-flex justify-content-center data" style={{fontSize:"15px"}}> 
 <table className=" table table-bordered text-center my-3 ">
   <tbody>   
   <tr>
     <th><b>S.No</b>
     </th><th><b>NAME</b></th>
     <th><b>QUALIFICATION</b></th>
     <th><b>CONTACT</b></th>
     <th><b>CITY</b></th>
     <th><b>STATE</b></th>
     <th><b>Edit</b></th>
     <th><b>Delete</b></th>
   </tr>
    {this.state.data1.map((item, index) => (
      <tr key={index}>
          <td>{index+1}</td> 
          <td>{item.name}</td>                      
          <td>{item.qualification}</td>
          <td>{item.contact}</td>
          <td>{item.city}</td>
          <td>{item.state}</td>
           <td> 
          
           <button type="button" className="btn btn-success" onClick={(e) => {this.EditData(item)}}>Edit</button>    
          </td> 
          <td> 
             <button type="button" className="btn btn-danger" onClick={(e) => {this.DeleteData(item._id)}}>Delete</button>
          </td> 
        </tr>
    ))}
  
    </tbody>
    </table>
    </div>      
</form> 
            
    );
  }
});

ReactDOM.render(<StudentAll  />, document.getElementById('root'))