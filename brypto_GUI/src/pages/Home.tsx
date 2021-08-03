import { IonCard, IonRow, IonFooter, IonCardContent, IonCardHeader, IonCol, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonSegment, IonSelect, IonSelectOption, IonTitle, IonToolbar, IonButton, IonText, IonCardTitle, IonSpinner, IonRadioGroup, IonRadio } from '@ionic/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import { closeOutline, heartSharp, removeCircleOutline, removeCircleSharp } from 'ionicons/icons';
import Image from '../image';



const Home: React.FC = () => {

  const [data, setData] = useState<any>({body:{key:0, value:0}, face:{key:0, value:0}, hands:{key:0, value:0}, head:{key:0, value:0}, access:{key:0, value:0}})
  const img = Image()
  const [image, setImage] = useState<string>(img)
  const [modal, setModal] = useState<boolean>(false)
  const [map, setMap] = useState<any>({})

  const createImage = (data:any) => {
    setModal(true)
    const dap = {
      body:data.body.key,
      face:data.face.key,
      hands:data.hands.key,
      head:data.head.key,
      access:data.access.key
    }
   axios.post("http://localhost:8080/bear", {data:dap}).then(res=>{
      console.log(res)
      setImage(res.data.data)
      setModal(false)
    })
  }

  useEffect(() => {
    axios.get("http://localhost:8080/show").then(res=>{
      setMap(res.data)
      console.log(res.data)
    })
  }, [image])



  return (
    <IonPage>
      <IonHeader >
        <IonToolbar color="dark">
          <IonTitle>Brypto Maker</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color="dark">
        <IonSegment>
        <IonCard style={{width:"400px", height:"300px"}}>
      
          <IonCardHeader>
            <IonRow>

            <IonCol size="5">
            <IonList lines="none">
            <IonItem>
              <IonRow>
                <IonCol size="9">
                {data.body.value==0?
              <IonCardTitle style={{fontSize:"0.6rem"}}>
                Body
              </IonCardTitle>
              :<IonText style={{fontSize:"0.6rem"}}>{data.body.value}</IonText>
              }
                </IonCol>
                <IonCol size="2">
                  {data.body.value !==0?
                  <IonIcon icon={closeOutline} size="large" onClick={()=>{
                    setData((data:any) => ({
                      ...data,
                      body: {
                        ...data.body,
                        value: 0,
                        key: 0
                      }
                    }
                      ));
                    }}></IonIcon>:
                    null
                  }
                  
                </IonCol>
              </IonRow>
              
              </IonItem>
              <IonItem>
              {data.head.value==0?
              <IonLabel style={{fontSize:"0.6rem"}}>
                Head
              </IonLabel>
              :<IonText style={{fontSize:"0.6rem"}}>{data.head.value}</IonText>
              }
              </IonItem>
              <IonItem>
            {data.hands.value==0?
              <IonLabel style={{fontSize:"0.6rem"}}>
                Hands
              </IonLabel>
              :<IonText style={{fontSize:"0.6rem"}}>{data.hands.value}</IonText>
              }
              </IonItem>
              <IonItem>
            {data.access.value==0?
              <IonLabel style={{fontSize:"0.6rem"}}>
                Access
              </IonLabel>
              :<IonText style={{fontSize:"0.6rem"}}>{data.access.value}</IonText>
              }
              </IonItem>
              <IonItem>
            {data.face.value==0?
              <IonLabel style={{fontSize:"0.6rem"}}>
                Face
              </IonLabel>
              :<IonText style={{fontSize:"0.6rem"}}>{data.face.value}</IonText>
              }
              </IonItem>
          </IonList>
          </IonCol>
          <IonCol size="6">
          
          {!modal?
          
          <IonImg style={{height:"250px", width:"250px"}} src={`data:image/jpeg;base64,`+`${image}`}></IonImg>:
          
          <IonImg style={{height:"250px", width:"250px", opacity:0.6}} src={`data:image/jpeg;base64,`+`${image}`}>
          </IonImg>
          
          }
          <IonSegment>
          {modal?
          <IonSpinner name="dots" style={{marginLeft:"80px"}}>

          </IonSpinner>:
          null
          }
          </IonSegment>
          
          </IonCol>
          </IonRow>
          </IonCardHeader>
          {/* <IonCardContent>
            <IonButton onClick={()=>{createImage()}}>
              Create
            </IonButton>
          </IonCardContent> */}
            
             
          
        </IonCard>

        </IonSegment>
        <IonCard color="light">
          <IonRow>
            <IonCol>
              <IonCardHeader>
                <IonCardTitle>
                Body
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent style={{overflowY:"auto", maxHeight:"400px"}}>
                <IonList>
                <IonRadioGroup value={JSON.stringify({value:data.body.value, key:data.body.key})} 
                onIonChange={(e)=>{
                  const d = JSON.parse(e.detail.value)
                  var dat = data
                  dat.body.value = d.value
                  dat.body.key = d.key
                  createImage(dat)
                  setData((data:any) => ({
                    ...data,
                    body: {
                      ...data.body,
                      value: d.value,
                      key: d.key
                    }
                  }
                    ));
                  
                }
              }>
                
                  {"body" in map? 
                    map.body?.map((b:any, i:any)=>(
                      <IonItem key={i}>
                        
                        <IonLabel style={{color:"grey", fontSize:"0.6rem"}} >
                        {i+1} - {b[i+1].split("\\")[1]}
                        </IonLabel>
                        <IonRadio value={JSON.stringify({value:b[i+1].split("\\")[1], key:i+1})}></IonRadio>
                        
                      </IonItem>  
                      )):
                      <IonSpinner>

                      </IonSpinner>
                  }
                  
                </IonRadioGroup>
                </IonList>
              </IonCardContent>
            </IonCol>
            <IonCol>
              <IonCardHeader>
                <IonCardTitle>
                Face
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent style={{overflowY:"auto", maxHeight:"400px"}}>
                <IonList>
                <IonRadioGroup value={JSON.stringify({value:data.face.value, key:data.face.key})} 
                onIonChange={(e)=>{
                  const d = JSON.parse(e.detail.value)
                  var dat = data
                  dat.face.value = d.value
                  dat.face.key = d.key
                  createImage(dat)
                  setData((data:any) => ({
                    ...data,
                    face: {
                      ...data.face,
                      value: d.value,
                      key: d.key
                    }
                  }
                    ));
                  
                }
              }>
                  {"face" in map? 
                    map.face?.map((b:any, i:any)=>(
                      <IonItem key={i}>
                        
                        <IonLabel style={{color:"grey", fontSize:"0.6rem"}} >
                        {i+1} - {b[i+1].split("\\")[1]}
                        </IonLabel>
                        <IonRadio value={JSON.stringify({value:b[i+1].split("\\")[1], key:i+1})}></IonRadio>
                        
                      </IonItem>  
                      )):
                      <IonSpinner>

                      </IonSpinner>
                  }
                  
                </IonRadioGroup>
                </IonList>
              </IonCardContent>
            </IonCol>
            <IonCol>
              <IonCardHeader>
                <IonCardTitle>
                Access
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent style={{overflowY:"auto", maxHeight:"400px"}}>
                <IonList>
                <IonRadioGroup value={JSON.stringify({value:data.access.value, key:data.access.key})} 
                onIonChange={(e)=>{
                  const d = JSON.parse(e.detail.value)
                  var dat = data
                  dat.access.value = d.value
                  dat.access.key = d.key
                  createImage(dat)
                  setData((data:any) => ({
                    ...data,
                    access: {
                      ...data.access,
                      value: d.value,
                      key: d.key
                    }
                  }
                    ));
                  
                }
              }>
                  {"access" in map? 
                    map.access?.map((b:any, i:any)=>(
                      <IonItem key={i}>
                        
                        <IonLabel style={{color:"grey", fontSize:"0.6rem"}} >
                        {i+1} - {b[i+1].split("\\")[1]}
                        </IonLabel>
                        <IonRadio value={JSON.stringify({value:b[i+1].split("\\")[1], key:i+1})}></IonRadio>
                        
                      </IonItem>  
                      )):
                      <IonSpinner>

                      </IonSpinner>
                  }
                  
                </IonRadioGroup>
                </IonList>
              </IonCardContent>
            </IonCol>
            <IonCol>
              <IonCardHeader>
                <IonCardTitle>
                Hands
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent style={{overflowY:"auto", maxHeight:"400px"}}>
                <IonList>
                <IonRadioGroup value={JSON.stringify({value:data.hands.value, key:data.hands.key})} 
                onIonChange={(e)=>{
                  const d = JSON.parse(e.detail.value)
                  var dat = data
                  dat.hands.value = d.value
                  dat.hands.key = d.key
                  createImage(dat)
                  setData((data:any) => ({
                    ...data,
                    hands: {
                      ...data.hands,
                      value: d.value,
                      key: d.key
                    }
                  }
                    ));
                  
                }
              }>
                  {"hands" in map? 
                    map.hands?.map((b:any, i:any)=>(
                      <IonItem key={i}>
                        
                        <IonLabel style={{color:"grey", fontSize:"0.6rem"}} >
                        {i+1} - {b[i+1].split("\\")[1]}
                        </IonLabel>
                        <IonRadio value={JSON.stringify({value:b[i+1].split("\\")[1], key:i+1})}></IonRadio>
                        
                      </IonItem>  
                      )):
                      <IonSpinner>

                      </IonSpinner>
                  }
                  
                </IonRadioGroup>
                </IonList>
              </IonCardContent>
            </IonCol>
            <IonCol>
              <IonCardHeader>
                <IonCardTitle>
                Head
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent style={{overflowY:"auto", maxHeight:"400px"}}>
                <IonList>
                <IonRadioGroup value={JSON.stringify({value:data.head.value, key:data.head.key})} 
                onIonChange={(e)=>{
                  const d = JSON.parse(e.detail.value)
                  var dat = data
                  dat.head.value = d.value
                  dat.head.key = d.key
                  createImage(dat)
                  setData((data:any) => ({
                    ...data,
                    head: {
                      ...data.head,
                      value: d.value,
                      key: d.key
                    }
                  }
                    ));
                  
                }
              }>
                  {"head" in map? 
                    map.head?.map((b:any, i:any)=>(
                      <IonItem key={i}>
                        
                        <IonLabel style={{color:"grey", fontSize:"0.6rem"}} >
                        {i+1} - {b[i+1].split("\\")[1]}
                        </IonLabel>
                        <IonRadio value={JSON.stringify({value:b[i+1].split("\\")[1], key:i+1})}></IonRadio>
                        
                      </IonItem>  
                      )):
                      <IonSpinner>

                      </IonSpinner>
                  }
                  
                </IonRadioGroup>
                </IonList>
              </IonCardContent>
            </IonCol>
          </IonRow>
        </IonCard>
        
      
      <IonFooter>
        {/* <IonToolbar> */}
          <IonSegment>
          <IonLabel style={{fontSize:"0.5rem"}}>
            Made with <IonIcon icon={heartSharp}></IonIcon> by flashiam
          </IonLabel>
          </IonSegment>
          <IonCard>
            <IonLabel>
              .
            </IonLabel>
          </IonCard>
        {/* </IonToolbar> */}
      </IonFooter>
      </IonContent>
    </IonPage>
  );
};

export default Home;
