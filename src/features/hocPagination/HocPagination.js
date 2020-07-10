import React from "react";

function HocPagination(WrappedComponent) {

  return class extends React.Component {
    constructor(props){
      super(props);

      
    }

    render() {
      return <WrappedComponent />
    }
  }
}

export default HocPagination