import React, { Component } from 'react';
import axios from 'axios'


class Dashboard extends Component {

  constructor(props){
    super(props);
    this.state = { }
  }


  getArtists = async (arr) => {
    try {

    let queryStrings = arr.map( artist => {
      let split = artist.split(' ')
      return split.join('%20')
    })

    let artists = {}
    for (let each of queryStrings) {
      let res = await axios(`https://api.spotify.com/v1/search?q=${each}&type=artist`, {
        type: 'GET',
        headers: {'Authorization': 'Bearer ' + this.state.token}
      })
      artists[each] = res.data.artists.items[0]
    }
    console.log(artists)
    this.setState({...this.state, artists})

  } catch (error) {
  console.error(error)
}
}

  componentDidMount() {
    axios.get('/getUser')
      .then(async res => {
        this.setState(res.data)
        this.getArtists(['Sum 41', 'Metallica', 'Red Hot Chili Peppers']);
      })
  }

  render() {
    return (
    <div className="App">
      Token: {this.state.token}
    </div>
    );
  }
}
export default Dashboard;