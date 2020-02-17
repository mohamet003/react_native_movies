import React from 'react'
import {StyleSheet,View, Button, TextInput,FlatList,ActivityIndicator} from 'react-native'
import Films from "../Helpers/FilmsData";
import FilmItem from '../Helpers/FilmItem'
import {getFilmByText} from "../API/FilmAPI";

class Search extends React.Component {

    constructor(props){
        super(props)
        this.state = { films : [],
            isLoading: false
        }

        this.searchText = ""
        this.page = 0
        this.totalePage = 0
    }

    _loadFilm(){
        this.setState({isLoading:true})
        if (this.searchText.length > 0) {
            return getFilmByText(this.searchText,this.page+1).then(data => {

                this.page = data.page
                this.totalePage = data.total_pages
                this.setState({
                    films: [...this.state.films,...data.results],
                    isLoading:false
                })
            })
        }
    }

    _searchFilm(){
        this.page = 0
        this.totalePage = 0
        this.setState({
            films:[]
        },()=> {
            console.log(this.page+' totalesPages '+this.totalePage+' FIlms '+this.state.films)
            this._loadFilm()
        })


    }

    _searchByText(text){
        this.searchText = text
    }

    _loader(){
        if (this.state.isLoading){
            return (
                <View style={style.loader_container}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            )
        }
    }

  render(){
      console.log(this.state.films)

    return (
        <View style={{marginTop:20}}>
          <TextInput onSubmitEditing={()=> this._searchFilm()} onChangeText={(text)=> this._searchByText(text)} style={[style.textInput]} placeholder={"Titre du film"} />
          <Button style={style.main_container}  title={"Recherche"} onPress={() => this._searchFilm() } />

          <FlatList
              onEndReachedThreshold={0.5}
              onEndReached={()=> {
                  if (this.state.films.length > 0 && this.page < this.totalePage){
                      this._loadFilm()
                  }
              }}
              data={this.state.films}
              renderItem={({ item }) => <FilmItem film={item}/>}
              keyExtractor={item => item.id.toString()}
          />

            {this. _loader()}
        </View>
    )
  }
}

const style = StyleSheet.create( {
  main_container:{
    height:50,
    flex:1
  },
textInput :{
  marginLeft:5,
  marginRight:5,
  height:50,
  borderColor:'black',
  borderWidth:1,
  paddingLeft:5
},
    loader_container:{
      position:'absolute',
        left:0,
        right:0,
        top:100,
        bottom:0,
        alignItems:'center',
        justifyContent:'center'
    }

})
export default Search