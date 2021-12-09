using System;
using System.Collections;
using System.Collections.Generic;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using UnityEngine;
using UnityEngine.Networking;

namespace DarkDescent
{
	public static class ApiManager
	{
		public class Api
		{
			public delegate void ApiCallback(string result);

			public IEnumerator Get(string apiPath, ApiCallback callback)
			{
				UnityWebRequest www = UnityWebRequest.Get("http://localhost:2000/api" + apiPath);
				yield return www.SendWebRequest();

				if (www.result != UnityWebRequest.Result.Success)
				{
					Debug.Log(www.error);
					callback("");
				}
				else
				{
					Debug.Log(www.downloadHandler.text);

					byte[] results = www.downloadHandler.data;
					callback(Encoding.ASCII.GetString(results));
				}
			}
		}


	}
}
