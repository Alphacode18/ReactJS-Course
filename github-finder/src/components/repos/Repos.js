import React, { useContext } from 'react';
import RepoItem from './RepoItem';
import PropTypes from 'prop-types';

function Repos({ repos }) {
  return repos.map((repo) => <RepoItem repo={repo} key={repo.id} />);
}

Repos.propType = {
  repos: PropTypes.array.isRequired,
};

export default Repos;
