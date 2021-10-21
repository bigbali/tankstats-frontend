from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from django.shortcuts import render
from .serializers import (
    BulkMapSerializer,
    SafeStrategicMapSerializer,
    StrategicMapSerializer,
    SingleMapSerializer
)
from .models import StrategicMap, Map
import json
from uuid import uuid4
# Create your views here.


@csrf_exempt
def uuid(request):
    if request.method == "GET":
        return JsonResponse({
            "uuid": uuid4()
        })
    else:
        return "Only GET requests are accepted!"


@csrf_exempt
def strategic_map(request, id):
    if (request.method == "GET"):
        #im = InteractiveMap.objects.create(name="szilva")

        data = SafeStrategicMapSerializer(StrategicMap.objects.get(id=id))

        if data.data["is_password_protected"]:
            # return JsonResponse({"faszom": "faszom"}, safe=False)
            pass

        return JsonResponse(data.data)

    if (request.method == "POST"):
        #password = request.POST.get("password")

        #data = StrategicMapSerializer(StrategicMap.objects.get(id=id))

        # if data.data.get("password") == password:
        #     return JsonResponse(data.data)

        return "Anyád picsája"

    return "not supported"


@csrf_exempt
def strategic_map_auth(request):
    if (request.method == "POST"):
        input = json.loads(request.body)
        id = input.get("id")
        password = input.get("password")

        data = StrategicMapSerializer(StrategicMap.objects.get(id=id)).data

        if data.get("password") == password:
            data.pop("password")
            data.update({"is_authorized": True})

            return JsonResponse(data)

        return JsonResponse(json.dumps({"lofasz": "lofaszt"}), safe=False)

    return "not supported"


def maps(request):
    maps = Map.objects.all()
    serialized_maps = BulkMapSerializer(maps, many=True)
    # print(serialized_maps.data)

    return JsonResponse({
        "maps": serialized_maps.data
    })


def map(request, slug):
    map = Map.objects.get(slug=slug)
    serialized_map = SingleMapSerializer(map)

    return JsonResponse(serialized_map.data)
