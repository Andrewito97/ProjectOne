const movieApi = {
    async create(token, movie) {
        try {
          const response = await fetch('/myapi/movies', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Authorization': 'Bearer ' + token
              },
              body: movie
          });
          return response.json();
      }
      catch (error) {
          console.log(error);
      }
  },
  async list() {
      try {
          const response = await fetch('/myapi/movies', {
              method: 'GET',
          });
          return response.json();
      }
      catch (error) {
          console.log(error);
      }
  }
};

export default movieApi;
