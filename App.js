import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import {Header} from 'react-native-elements';

export default class App extends React.Component {
  constructor(){
    super();
    this.state={
text:'',
word:'',
definition:'',
    }
  }
  getWord=(word)=>{
    var searchKeyword=word.toLowerCase()
    var url = "https://rupinwhitehatjr.github.io/dictionary/%22"+searchKeyword+"%22.json"
    return fetch(url)
    .then((data)=>{
if(data.status===200)
{
  return data.json()
}
else{
  return null
}
    })
    .then((response)=>{
      if(responseObject)
      {
var wordData = responseObject.definitions[0]
var definition=wordData.description
var lexicalCategory=wordData.wordtype
this.setState({
  "word":this.state.text,
  "definition":definition,
  "lexicalCategory":lexicalCategory
})
      }
      else
      {
this.setState({
  "word":this.state.text,
  "definition":"Not Found"
})
      }
    })
  }

  render() {
    return (


      <View style={styles.container}>
      <Header backgroundColor = {"red"} 
      centerComponent = {{text:"Dictionary", style:{color:"blue", fontSize:30}}}/> 

       <TextInput style = {styles.inputBox} 
      onChangeText ={(text)=>{
        this.setState({
          text:text,
          isSearchedPressed:false,
          word:"loading...",
          lexicalCategory:'',
          examples:[],
          definition:""
        });
      }}
      value={this.state.text}/> 

       <TouchableOpacity 
       style={styles.enter}
      onPress={()=>{
        this.setState({isSearchedPressed:true});
        this.getWord(this.state.text)
      }}>
      <Text style = {styles.enter}> Enter </Text>
      </TouchableOpacity>
      </View>

/*<View style={styles.detailsContainer}>
  <Text style={styles.detailsTitle}>
    Word:{""}
  </Text>
  <Text style={{fontSize:18}}>
    {this.state.word}
  </Text>
</View>

<View style={styles.detailsContainer}>
<Text style={styles.detailsTitle}>
Type:{""}
</Text>
<Text style={{fontSize18}}>
{this.state.lexicalCategory}
</Text>
</View>

<View style={{flexDirection:"row",flexWrap:"wrap"}}>
<Text style={styles.detailsTitle}>
Definition:{""}
</Text>
<Text style={{fontSize18}}>
{this.state.definition}
</Text>
</View>

<View style={styles.outputContainer}>
<Text style={{fontSize:20}}>
{
  this.state.isSearcgPressed && this.state.word === "loading..."
  ? this.state.word
  :""
}
</Text>
{
  this.state.word !== "loading..."?
  (
    <View style={{justifyContent:"center",marginLeft:10}}>
    <View style={styles.detailsContainer}>
    <Text style={styles.detailsTitle}>
    Word:{""}
    </Text>
    <Text style={{fontSize:18}}>
    {this.state.word}
    </Text>
    </View>
    <View style={styles.detailsContainer}>
    <Text style={styles.detailsTitle}>
    Type:""
    </Text>
    <Text style={{fontSize:18}}>
    {this.state.lexicalCategory}
    </Text>
    </View>
  )
}
*/

    );
  }
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#abfd72',
  },
inputBox:{
  borderWidth:7,
  borderColor:"blue",
  marginTop:30,
  width:200,
  height:60,
  alignSelf:"center",
  textAlign:"center",
  color:"black",
  fontSize:25,
},
enter:{
  width:100,
    height:55,
    fontSize:30,
    alignSelf:"center",
    margin:10
},
showText:{
  marginTop:20,
  fontSize:40,
  fontWeight:"bold",
  textAlign:"center",
}
});
