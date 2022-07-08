import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import Graph from 'graphology';
import { dijkstra,edgePathFromNodePath } from 'graphology-shortest-path';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  firsthub:any='S'
  lasthub:any='L'
  finalHour:any=0
  finalRoute:any
  allNodes:any
  allConnection:any
    ngOnInit(): void {
      this.addNodes()
      this.addEdge()
      let aaa = dijkstra.bidirectional(this.graph, this.firsthub,this.lasthub,'traveltime')
      let routesHour = this.calculatePath(edgePathFromNodePath(this.graph, aaa))
      this.finalRoute = aaa
      this.finalHour=routesHour
    }
    graph = new Graph({allowSelfLoops: false});
    addNodes(){
      this.graph.addNode('S');
      this.graph.addNode('A');
      this.graph.addNode('B');
      this.graph.addNode('C');
      this.graph.addNode('D');
      this.graph.addNode('E');
      this.graph.addNode('F');
      this.graph.addNode('G');
      this.graph.addNode('H');
      this.graph.addNode('K');
      this.graph.addNode('L');
      this.graph.addNode('M');
      this.graph.addNode('N');
      this.graph.addNode('P');
      this.graph.addNode('Y');
      this.graph.addNode('Z');
    }
    addEdge(){


      this.graph.addEdge('A', 'S',{traveltime:6});
      this.graph.addEdge('A', 'D',{traveltime:8});

      this.graph.addEdge('B', 'D',{traveltime:15});
      this.graph.addEdge('B', 'C',{traveltime:21});
      this.graph.addEdge('B', 'Z',{traveltime:17});

      this.graph.addEdge('C', 'E',{traveltime:22});

      this.graph.addEdge('D', 'A',{traveltime:7});
      this.graph.addEdge('D', 'F',{traveltime:2});
      this.graph.addEdge('D', 'E',{traveltime:10});
      this.graph.addEdge('D', 'L',{traveltime:10});

      this.graph.addEdge('E', 'D',{traveltime:10});
      this.graph.addEdge('E', 'G',{traveltime:12});

      this.graph.addEdge('F', 'G',{traveltime:10});
      this.graph.addEdge('F', 'P',{traveltime:12});

      this.graph.addEdge('G', 'H',{traveltime:6});
      this.graph.addEdge('G', 'D',{traveltime:9});

      this.graph.addEdge('H', 'K',{traveltime:11});
      this.graph.addEdge('H', 'E',{traveltime:13});

      this.graph.addEdge('K', 'L',{traveltime:12});

      this.graph.addEdge('M', 'C',{traveltime:35});
      this.graph.addEdge('M', 'Y',{traveltime:9});

      this.graph.addEdge('N', 'L',{traveltime:5});

      this.graph.addEdge('P', 'K',{traveltime:2});
      this.graph.addEdge('P', 'N',{traveltime:7});

      this.graph.addEdge('S', 'A',{traveltime:4});
      this.graph.addEdge('S', 'B',{traveltime:10});
      this.graph.addEdge('S', 'C',{traveltime:12});

      this.graph.addEdge('Y', 'M',{traveltime:8});
      this.graph.addEdge('Y', 'Z',{traveltime:2});

      this.graph.addEdge('Z', 'B',{traveltime:17});

    }
    calculatePath(routes:any){
      let totalTime = 0
      routes.forEach((route:any,index:any) => {
        totalTime = totalTime+ this.graph.getEdgeAttributes(route)['traveltime']
      });
      console.log("Total time required : "+totalTime)
      return totalTime
    }
  }
