import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatServiceService } from '../../services/chat-service/chat-service.service';
import { PeerService } from '../../services/peer/peer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-page',
  standalone: true,
  imports: [],
  templateUrl: './video-page.component.html',
  styleUrl: './video-page.component.scss'
})
export class VideoPageComponent implements OnInit, AfterViewInit {

  @ViewChild('videos') videos?: ElementRef<HTMLDivElement>;

  constructor(private socketService: ChatServiceService, private peerService: PeerService, private router: Router) { }

  ngOnInit(): void {
    const name = localStorage.getItem('name');
    if (!name) this.router.navigate(['']);
    this.peerService.onOpen().subscribe(id => this.socketService.emit('join', id));
  }

  ngAfterViewInit(): void {
    this.getMyVideo();
  }

  getMyVideo() {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    }).then(stream => {
      this.addVideo(this.getHTMLVideoElement(true), stream);
      this.peerService.onCall().subscribe(connection => {
        connection.answer(stream);
        const video = this.getHTMLVideoElement(false);
        connection.on('stream', joinedStream => this.addVideo(video, joinedStream));
        connection.on('close', () => video.remove());
      })
      this.socketService.onEvent('joined').subscribe(userID => {
        const video = this.getHTMLVideoElement(false);
        this.peerService.callToPeer(userID, stream, (joinedStream) =>
          this.addVideo(video, joinedStream), () => video.remove()
        )
        this.socketService.onEvent('disconnected').subscribe(() => video.remove());
      });
    })
  }

  getHTMLVideoElement(muted: boolean): HTMLVideoElement {
    const video = document.createElement('video');
    video.muted = muted;
    video.classList.add('w-100', 'h-100');
    return video;
  }

  addVideo(video: HTMLVideoElement, stream: MediaStream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => video.play());
    this.videos?.nativeElement.append(video);
  }

}
