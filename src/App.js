import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color: '#FFF'
}

let fakeServerData = {
  user: {
    name: 'John',
    playlists: [
      {
        name: 'My Favorites',
        songs: [
          {name: 'Grip It', duration: 1354},
          {name: 'Pull It', duration: 1235},
          {name: 'Eat It', duration: 3000}
        ]
      },
      {
        name: 'Discover Weekly',
        songs: [
          {name: 'Grip It', duration: 1354},
          {name: 'Graph It', duration: 1235},
          {name: 'Eat It', duration: 3000}
        ]
      },
      {
        name: 'More Favorites',
        songs: [
          {name: 'Trip It', duration: 1354},
          {name: 'Pull It', duration: 1235},
          {name: 'Eat It', duration: 3000}
        ]
      },
      {
        name: 'Best Playlist',
        songs: [
          {name: 'Flip It', duration: 1354},
          {name: 'Pull It', duration: 1235},
          {name: 'Eat It', duration: 3000}
        ]
      }
    ]
  }
}

class PlaylistCounter extends Component {
  render () {
    return (
      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>{this.props.playlists.length} Playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render () {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, [])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)
    return (
      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>{Math.round(totalDuration/3600)} Hours</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
        <div style={defaultStyle}>
          <img/>
          <input type="text"/>
        </div>

    );
  }
}

class Playlist extends Component {
  render () {
    return (
      <div style={{...defaultStyle, width: "25%", display: 'inline-block'}}>
        <h3>{this.props.playlist.name}</h3>
        <ul>
          {this.props.playlist.songs.map(song =>
            <li>{song.name}</li>
            )}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {serverData: {}}
  }
  componentDidMount() {
    setTimeout(() => {
    this.setState({serverData: fakeServerData})
    }, 1000);
  }
  render() {
      return (
        <div className="App">
          {this.state.serverData.user ?
          <div>
            <h1 style={{...defaultStyle, fontSize: '54px'}}>{this.state.serverData.user && this.state.serverData.user.name}'s Playlists</h1>}
            <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
            <HoursCounter playlists={this.state.serverData.user.playlists}/>
            <Filter/>
            {this.state.serverData.user.playlists.map(playlist =>
              <Playlist playlist={playlist} />
            )}

          </div> : <h1 style={defaultStyle}>Loading.....</h1>
          }
        </div>
    );
  }
}

export default App;
