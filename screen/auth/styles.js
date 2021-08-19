import {COLORS} from '../../constants'

export default { container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header:{
    fontWeight:"bold",
    fontSize:40,
    color:COLORS.white,
    textAlign:'center',
    textShadowRadius:10,
    textShadowOffset:{height:2},
    textShadowColor:COLORS.black

  },
  subheaderStyle:{
    textAlign:'center',
    color:COLORS.white,
    textShadowRadius:10,
    marginBottom:10,
    textShadowOffset:{height:2},
    textShadowColor:COLORS.black
  },
  input: {
    backgroundColor:COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: 10,
    fontSize: 18,
    borderRadius: 20,
    marginBottom:5,
    marginHorizontal:20
    
  },
  input2:{
    borderBottomWidth: 1,
    borderColor: COLORS.white,
    color:COLORS.white,
    padding: 10,
    fontSize: 18,
    marginBottom:5,
    marginHorizontal:20,
  },
  startBtn:{
    backgroundColor:"#90bdff",
    borderRadius:50,
    paddingHorizontal:20,
    paddingVertical:10,
    margin:10,
    alignItems:"center",
    width:'30%',
    alignSelf:'center'

  },
  signUpText:{
    color:COLORS.darkBlue
  },
  startText:{
    color:"white"
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  },
}