class EventLocations
{
    id;
    id_location;
    name;
    full_adress;
    max_capacity;
    latitude;
    longitude;
    id_creator_user;
}

ConstructorLocations(i,il,n,f,m,la,lo,id)
{
    this.id = i;
    this.id_location = il;
    this.name = n;
    this.full_adress = f;
    this.max_capacity = m;
    this.latitude = la;
    this.longitude = lo;
    this.id_creator_user = id;
}

export default EventLocations