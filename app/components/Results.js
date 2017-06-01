var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;
var queryString = require('query-string');
var api = require('../utils/api');
var PlayerPreview = require('./PlayerPreview');
var Loading = require('./Loading');

function Profile (props) {
  var info = props.info;
  return (
    <PlayerPreview 
      avatar={info.avatar_url}
      username={info.login}
    >
      <ul>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href="{info.blog}">{info.blog}</a></li>}
      </ul>
    </PlayerPreview>

  )
}
Profile.propTypes = {
  info: PropTypes.object.isRequired,
}
function Player (props) {
  return (
    <div>
      <h1 className="header">{props.label}</h1>
      <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
      <Profile info={props.profile}/>
    </div>

  )
}
Player.propTypes = {
  profile: PropTypes.object.isRequired,
  label:PropTypes.string.isRequired,
  score:PropTypes.number.isRequired,
}
class Results extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
       winner: null,
       loser: null,
       error: null,
       loading: true
     };
  }
  componentDidMount() {
    let players = queryString.parse(this.props.location.search);
    api.battle([
      players.playerOneName,
      players.playerTwoName
    ])
    .then(results=> {
      if (!results) {
        return this.setState(()=> {
          return {
            error: 'looks like there was error. Check that both users exist in GitHub',
            loading: false
          };
        });
      }
      this.setState(() => {
        return {
          error: null,
          winner: results[0],
          loser: results[1],
          loading: false,
        };
      });
    });
  }
  render() {
    var error = this.state.error;
    var winner = this.state.winner;
    var loser = this.state.loser;
    var loading = this.state.loading;
    if (loading) {
      return (
        <Loading />
      )
    }
    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }
    return (
      <div className="row">
        <Player 
          label="winner"
          score={winner.score}
          profile={winner.profile}
        />
        <Player 
          label="loser"
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    )
  }
}
module.exports = Results;