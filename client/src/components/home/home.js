import React from "react";

type Props = {
  history?: object,
  location?: object,
  match?: object,
  staticContext?: any
}
const Home = (props: Props) => {
  console.log(props)
  const error = props.location.state ? (<h1>{props.location.state.error}</h1>) : null;
  const body = (<h1>Home Page</h1>);
  return(
    <div>
      {error}
      {body}
    </div>
  ) 
}

export default Home;
