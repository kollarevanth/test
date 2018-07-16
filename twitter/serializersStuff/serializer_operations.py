from django.contrib.auth import authenticate, login
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import redirect
from rest_framework import status, generics
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.generics import CreateAPIView,ListAPIView,UpdateAPIView
from rest_framework.status import HTTP_401_UNAUTHORIZED
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView

from .serializers import *
from twitter.models import *
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.db.models import F,Q
from django.contrib.auth.models import User
from django.views.generic import *
class following_list(ListAPIView):
     
      
    serializer_class = following_serializer
    def get_queryset(self):
        queryset=Following.objects.all().filter(user_id=self.request.user.id)
        return queryset



class getUsers(ListAPIView):
    serializer_class = UserSerializer
    def get_queryset(self):
        queryset=User.objects.all().values('id','username')
        return queryset





class getPost(ListAPIView):
    serializer_class = posts_serializer
    def get_queryset(self):
        queryset=Posts.objects.all().filter(id=self.kwargs.get('postid'))
        return queryset


class getProfilePic(ListAPIView):
    serializer_class = profilepic_serializer
    def get_queryset(self):
        queryset = Profilepics.objects.all().filter(user__id=self.request.user.id).latest('id')
        q1=Profilepics.objects.all().filter(id=queryset.id)
        return q1


class getdp(ListAPIView):
    serializer_class = profilepic_serializer
    def get_queryset(self):
        queryset = Profilepics.objects.all().filter(user__id=self.kwargs.get('uid')).latest('id')
        q1=Profilepics.objects.all().filter(id=queryset.id)
        return q1



class posts_list(ListAPIView):
    serializer_class = posts_serializer
    def get_queryset(self):
        q=list(Following.objects.values('following_id').filter(user_id=self.request.user.id))
        l=[]
        for i in q:
            l.append(i['following_id'])
        queryset=Posts.objects.all().filter(Q(user__id__in=l))
        print(queryset.query)
        return queryset.order_by('-id')


class specific_user_posts_list(ListAPIView):
    serializer_class = posts_serializer
    def get_queryset(self):
        queryset=Posts.objects.all().filter(user_id=self.kwargs.get('uid'))
        print(queryset.query)
        return queryset

class user_posts_list(ListAPIView):
    serializer_class = posts_serializer
    def get_queryset(self):
        queryset=Posts.objects.all().filter(user_id=self.request.user.id)
        print(queryset.query)
        return queryset



class comments_list(ListAPIView):
    serializer_class = comments_serializer
    def get_queryset(self):
        queryset=Comments.objects.all().filter(post_id=self.kwargs.get('postid'))
        return queryset

class getComment(ListAPIView):
    serializer_class = comments_serializer
    def get_queryset(self):
        queryset=Comments.objects.all().filter(id=self.kwargs.get('commentid'))
        return queryset


class replys_list(ListAPIView):
    serializer_class = reply_serializer
    def get_queryset(self):
        queryset=Replys.objects.all().filter(comment_id=self.kwargs.get('commentid'))
        return queryset


class getfollowing(ListAPIView):
    serializer_class = profilepic_serializer
    def get_queryset(self):
        f=list(Following.objects.all().values().filter(user_id=self.request.user.id))
        li=[]
        for i in f:
            li.append(i['following_id'])
        queryset=Profilepics.objects.all().filter(Q(user__id__in=li))
        return queryset



class getfollowers(ListAPIView):
    serializer_class = profilepic_serializer
    def get_queryset(self):
        f=list(Following.objects.all().values().filter(following_id=self.request.user.id))
        li=[]
        for i in f:
            li.append(i['user_id'])
        queryset=Profilepics.objects.all().filter(Q(user__id__in=li))
        return queryset



class add_following(CreateAPIView):
    serializer_class = following_serializer
    def create(self, request, *args, **kwargs):
        following=Following.objects.create(user_id=self.request.user.id,following_id=int(request.data.get('following_id')))
        following.save()
        return HttpResponse("success")

class add_posts(CreateAPIView):
    def create(self, request, *args, **kwargs):
        p=Posts.objects.create(user_id=self.request.user.id,name=self.request.user.username,post=request.data.get('Post'),likes=0)
        p.save()
        print(p.post)
        return HttpResponse("success")

class add_profilepic(CreateAPIView):
    serializer_class = profilepic_serializer
    def create(self, request, *args, **kwargs):
        Profilepics.objects.filter(user_id=self.request.user.id).delete()
        p = Profilepics.objects.create(user_id=self.request.user.id,name=self.request.user.username,pic=request.data.get('pic'))
        p.save()
        print(p.pic)
        return HttpResponse("success")




class add_comments(CreateAPIView):
    queryset = Comments.objects.all()
    serializer_class = comments_serializer
    def create(self, request, *args, **kwargs):
        comments=Comments.objects.create(post_id=kwargs['postid'],comment=request.data.get('comment'),name=request.user.username)
        comments.save()
        return JsonResponse({"x":"success"})



class add_replys(CreateAPIView):
     
      
    queryset = Replys.objects.all()
    serializer_class = reply_serializer
    def create(self, request, *args, **kwargs):
        reply=Replys.objects.create(comment_id=kwargs['commentid'],reply=request.data.get('reply'),name=self.request.user.username)
        reply.save()
        return JsonResponse({"x":"success"})





class likepost(UpdateAPIView):
    serializer_class = posts_serializer
    lookup_field = 'id'
    def update(self, request, *args, **kwargs):
        post=Posts.objects.all().filter(id=kwargs['id']).update(likes=F('likes')+1)
        return JsonResponse({"x":"success"})


class unlikepost(UpdateAPIView):
    serializer_class = posts_serializer
    lookup_field = 'id'
    def update(self, request, *args, **kwargs):
        post=Posts.objects.all().filter(id=kwargs['id']).update(likes=F('likes')-1)

        return JsonResponse({"x":"success"})




@api_view(["POST"])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)
    if not user:
        return Response({"error": "Login failed"}, status=HTTP_401_UNAUTHORIZED)

    token, _ = Token.objects.get_or_create(user=user)
    return Response({"token": token.key})


class SignupView(APIView):
    #authentication_classes = ()

    def post(self,request,format=None):
        print("Enters")
        data = JSONParser().parse(request)
        print(data)
        user = User.objects.create_user(username=data["username"],password=data["password"],email=data["email"])
        Profilepics.objects.create(user_id=user.id,pic="NULLU",name=user.username)
        if user is not None:
            return Response("successful")
        return JsonResponse("unsuccessful", safe=False)
