from urllib import response
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.http import HttpResponse, JsonResponse
from django.core import serializers

from .serializer import ActivitySerializer, NormalUserSerializer,  UserSerializer


from .models import Activity

User = get_user_model()


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer



class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class NormUserViewset(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.filter(is_staff=False)
    serializer_class = NormalUserSerializer


@api_view(['GET'])
def whoami(request):
    s = UserSerializer(request.user)
    return Response(s.data)

@api_view(['GET'])
def registerToActivity(request,two_id):
    id_list = two_id.split("-")
    int_id_list = list(map(int, id_list))
    user_snippets = User.objects.filter(id=int_id_list[0])
    if(len(user_snippets) > 0):
        user_snippet = user_snippets[0]
        selected_act = Activity.objects.filter(id=int_id_list[1])[0]
        user_snippet.save()
        user_snippet.activity_set.add(selected_act)
        result = user_snippet.activity_set.all()
        data = serializers.serialize("json", result)
        return HttpResponse(data, content_type="application/json")
    else:
        return response.HttpResponseNotFound()

@api_view(['GET'])
def cancelToActivity(request,two_id):
    id_list = two_id.split("-")
    int_id_list = list(map(int, id_list))
    user_snippets = User.objects.filter(id=int_id_list[0])
    if(len(user_snippets) > 0):
        user_snippet = user_snippets[0]
        selected_act = Activity.objects.filter(id=int_id_list[1])[0]
        user_snippet.save()
        user_snippet.activity_set.remove(selected_act)
        result = user_snippet.activity_set.all()
        data = serializers.serialize("json", result)
        return HttpResponse(data, content_type="application/json")
    else:
        return response.HttpResponseNotFound()

@api_view(['GET'])
def deleteActivity(request,pk):
    snippets = Activity.objects.filter(id=pk)
    if(len(snippets) > 0):
        snippet = snippets[0]
        snippet.delete()
    else:
        return response.HttpResponseNotFound()

@api_view(['GET'])
def showUserToActivity(request,pk):
    snippets = Activity.objects.filter(id=pk)
    if(len(snippets) > 0):
        snippet = snippets[0]
        snippet.save()
        result = snippet.user_set.all()
        data = serializers.serialize("json", result)
        return HttpResponse(data, content_type="application/json")
    else:
        return response.HttpResponseNotFound()
