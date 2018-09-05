import React from 'react';

import { Carousel, Button,SegmentedControl, WingBlank,WhiteSpace} from 'antd-mobile';
import './SelectExercise.css';
import Loading from '../../Loading';
import Hoc from '../../../HOC/Hoc';

  class SelectExercise extends React.Component {
    state = {
    imgHeight: 500,
    currentExercise: 0,
      index: 0,
      currentChild:0,
  }

//This function
  selectExercise = () => {
    this.props.onSelect(this.props.listExercise.exercises[this.state.index].exercise[this.state.currentExercise])
  }

  onChange = (e) => {
    console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
    this.setState({currentChild: e.nativeEvent.selectedSegmentIndex})
  }

  render() {

    if(this.props.listExercise && this.props.listExercise !== null){
      const exercises = this.props.listExercise.exercises;
      console.log(exercises)
      return (
        <div className="container">
          <Carousel className="space-carousel"
            frameOverflow="visible"
            cellSpacing={10}
            slideWidth={1}
            autoplay={false}
            infinite
            afterChange={index => this.setState({currentExercise: index}) }
          >

          { exercises[this.state.currentChild].exercise.map( (data, key) => (
            <div className="image-with-description" key={key}>
              <div className="excercise-header" style={{margin:"10px 0px 10px",backgroundColor:'white',color:'black', textAlign: "center"}}>{data.name}</div>
              <img
                key = { data.value }
                src={require(`../../../Assets/Workout/images/${key}.jpeg`)}
                alt={data.description}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto', description: data.description });
                }}
              />
            </div>
          ))}
          </Carousel>
          <WhiteSpace/>
          <div className="select-button">
            <WingBlank>
              <Button type="primary" onClick={() => this.selectExercise()}>Select</Button>
            </WingBlank>
            <WhiteSpace/>
          </div>
          <WhiteSpace/>
          {exercises.length > 1 &&
            <WingBlank>
            <SegmentedControl className='selectItem' selectedIndex={this.state.currentChild} values={[exercises[0].name, exercises[1].name]} onChange={this.onChange} on/>
            </WingBlank>
          }
          <WhiteSpace/>
        </div>
      );
    }else{
      return(
        <div>
        <WhiteSpace size='xl'/>
        <WhiteSpace size='xl'/>
        <WhiteSpace size='xl'/>
        <Loading mode="selectExercise"/>
        <WhiteSpace size='xl'/>
        <WhiteSpace size='xl'/>
        <WhiteSpace size='xl'/>
        </div>
      )
    }
  }
  // { this.props.excerciseArray.map( (data, key) => (
  //   <div className="image-with-description" key={key}>
  //     <div className="excercise-header" style={{ height:'25px',background:'black', color:'white', textAlign: "center"}}>{data.description}</div>
  //     <img
  //       key = { data.value }
  //       src={data.imgurl}
  //       alt={data.description}
  //       onLoad={() => {
  //         // fire window resize event to change height
  //         window.dispatchEvent(new Event('resize'));
  //         this.setState({ imgHeight: 'auto', description: data.description });
  //       }}
  //     />
  //   </div>
  // ))}

  }//end class
export default SelectExercise;
