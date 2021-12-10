import React, {useState, useEffect} from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from './services/api'

export default function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{

    api.get('/repositories').then(response=>{
        setRepositories(response.data)
    }).catch(e=>console.error(e))
      
  },[])

  // const handleAddRepository = async ()=>{
  //     const response = await api.post('repositories',{
  //         title:`Novo hora: ${Date.now()}`,
  //         url: "rerer", 
  //       techs: ["Node.js", "ReactJS"] 
  //     })

  //     setRepositories([...repositories, response.data])
  // }

  async function handleLikeRepository(id) {
    // console.log(id)
    const response = await api.post(`repositories/${id}/like`);
    const likedRepository = response.data;

    console.log(response.data)
    const repositoriesUpdated = repositories.map(repo=>{
      if(repo.id===id){
        return likedRepository;
      }else{
        return repo;
      }
    })

    setRepositories(repositoriesUpdated);

  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        {repositories.map((repo)=>(
          <View style={styles.repositoryContainer} key={repo.id}>
              <Text style={styles.repository}>{repo.title}</Text>

              {repo.techs.map(tech=>(
                <View style={styles.techsContainer} key={tech}>
                  <Text style={styles.tech}>
                    {tech}
                  </Text>
                </View>
              ))}
    
              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  testID={`repository-likes-${repo.id}`}
                >
                  {repo.likes}{repo.likes===1?' curtida':' curtidas'}
                </Text>
              </View>
    
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repo.id)}
                testID={`like-button-${repo.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
          </View>
        ))}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
