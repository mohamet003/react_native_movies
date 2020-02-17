import React from 'react'
import {StyleSheet,View,Text,Image} from 'react-native'
import {getImage} from "../API/FilmAPI";

class FilmItem extends React.Component {


  render(){
  const film  = this.props.film
    return (
        <View style={style.main_container}>

           <Image  style={{width: 120, height: 180,margin:5}} source={{uri:getImage(film.poster_path)}}/>

            <View style={{flex:2, flexDirection:'column'}}>
                            <View style={{flex:2,flexDirection:'row'}}>

                                <Text style={{fontSize: 20,color: Colors.black ,flexWrap:'wrap',paddingRight:5,flex:1}}    numberOfLines={1}>{film.title}</Text>

                                <Text style={{fontSize: 25,color: Colors.black,textAlign:'right'}} numberOfLines={1}>{film.vote_average}</Text>

                            </View>
                            <View style={{flex:7,padding:3}}>
                                <Text numberOfLines={6} >{film.overview} </Text>
                            </View>
                            <View style={{flex:1,padding:3}}>
                                <Text style={{textAlign:'right'}} >Sorti le {film.release_date} </Text>
                            </View>
            </View>
        </View>
    )
  }
}
const Colors = {
    white:'white',
    black:'black'
}
const style = StyleSheet.create( {
  main_container:{
    height:190,
    flex:1,
    flexDirection:'row',
    padding:5
  },
})
export default FilmItem