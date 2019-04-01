var app = new Vue({
  el: '#index',
  data: {
    name: "",
    level: 0,
    happiness: 0,
    people: [],
    findName: "",
    findPerson: null,
    addPerson: null,
  },
  created() {
    this.getPeople();
  },
  computed: {
    suggestions() {
      return this.people.filter(person => person.name.toLowerCase().startsWith(this.findName.toLowerCase()));
    }
  },
  methods: {
    async upload() {
      try {
        let r1 = await axios.post('/api/people', {
          name: this.name,
          level: this.level,
          happiness: this.happiness,
        });
        this.name = "";
        this.level = 0;
        this.happiness = 0;
        this.addPerson = r1.data;
        this.getPeople();
      } catch (error) {
        console.log(error);
      }
    },
    async getPeople() {
      try {
        let response = await axios.get("/api/people");
        this.people = response.data;
        return true;
      } catch (error) {
        console.log(error);
        }
    },
    async deletePerson(person) {
      try {
        let response = axios.delete("/api/person/" + person._id);
        console.log(person.name);
        console.log(this.addPerson.name);
        if(person.name == this.addPerson.name){
          this.addPerson = null;
        }
        this.findPerson = null;
        this.findName = "";
        this.getPeople();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async addWealth() {
      try {
        console.log(this.addPerson._id);
        let response = await axios.put("/api/person/" + this.addPerson._id, {
          level: (this.addPerson.level),
        });
        this.getPeople();
        this.addPerson = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectPerson(person) {
      this.findName = person.name;
      this.findPerson = person;
    },
    async addMarried() {
      try {
        console.log(this.addPerson._id);
        let response = await axios.put("/api/person/married/" + this.addPerson._id, {
          level: (this.addPerson.level),
          happiness: (this.addPerson.happiness),
        });
        this.getPeople();
        this.addPerson = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async addBaptism() {
      try {
        console.log(this.addPerson._id);
        let response = await axios.put("/api/person/baptism/" + this.addPerson._id, {
          level: (this.addPerson.level),
          happiness: (this.addPerson.happpiness),
        });
        this.getPeople();
        this.addPerson = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async addKids() {
      try {
        console.log(this.addPerson._id);
        let response = await axios.put("/api/person/kids/" + this.addPerson._id, {
          happiness: (this.addPerson.happiness),
          level: (this.addPerson.level),
        });
        this.getPeople();
        this.addPerson = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async addMotorcycle() {
      try {
        console.log(this.addPerson._id);
        let response = await axios.put("/api/person/motorcycle/" + this.addPerson._id, {
          level: (this.addPerson.level),
          happiness: (this.addPerson.happiness),
        });
        this.getPeople();
        this.addPerson = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
});
