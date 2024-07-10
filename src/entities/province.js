class Province{
    id;
    name;
    full_name;
    latitude;
    longitude;
    display_order;
}

ConstructorP(i,n,f,l,lo,d)
{
    this.id = i
    this.name = n;
    this.full_name = f;
    this.latitude = l;
    this.longitude = lo;
    this.display_order = d;
}
export default Province;